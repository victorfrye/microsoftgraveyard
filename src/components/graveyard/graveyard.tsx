'use client';

export default function Graveyard() {
    return (
        <section id="Graveyard">
            <ul className="d-flex flex-wrap justify-content-center p-0">

            </ul>
        </section>
    )
}

// @code {
//     [Parameter]
//     public IList < Corpse > Corpses { get; init; } =[];
//     private static DateOnly _today = DateOnly.FromDateTime(TimeProvider.System.GetLocalNow().DateTime);

//     private RenderFragment < Corpse > GraveTemplate = (corpse) =>
//     @<li class='col-8 col-md-5 col-xl-3 d-flex my-3 mx-md-4 rounded text-light'>
//         <div class="d-flex flex-column p-1">
//             @if (corpse.IsDead(_today))
//             {
//             <img src="/images/headstone.svg" class="img-grave m-2" alt="headstone" />
//             <p class="text-life-dates text-center">@corpse.GetLifeDates()</p>
//             }
//             else
//             {
//             <img src="/images/coffin.svg" class="img-grave m-2" alt="coffin" />
//             <p class="text-life-dates text-center">@corpse.GetExpectedDeathDate()</p>
//             }
//         </div>

//         <div class="d-block p-1">
//             <h2><a href=@corpse.Link target="_blank">@corpse.GetFullName()</a></h2>
//         <p>@corpse.GetObituary(_today)</p>
//     </div>
//     </li >;
//     }
